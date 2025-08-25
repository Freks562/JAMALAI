import * as BP from './backpay';

// Tiny inline VA table (enough to prove the math)
const rates = {
  schema: "va-compensation-1",
  "2024": {
    effective: "2023-12-01",
    minor: { "10": 171.23, "20": 338.49 },
    "30_60": {
      no_children: { veteran_alone: { "40": 755.28, "50": 1075.16, "60": 1361.88 } },
      with_children: { spouse_child: { "50": 1255.16 } },
      added: { each_additional_child_under18: { "50": 51 }, spouse_aid_and_attendance: { "50": 95 } }
    },
    "70_100": {
      no_children: { veteran_alone: { "70": 1716.28 } },
      with_children: { spouse_child: { "70": 1968.28 } }
    }
  },
  "2025": {
    effective: "2024-12-01",
    minor: { "10": 175.51, "20": 346.95 },
    "30_60": {
      no_children: { veteran_alone: { "40": 774.16, "50": 1102.04, "60": 1395.93 } },
      with_children: { spouse_child: { "50": 1287.04 } },
      added: { each_additional_child_under18: { "50": 53 }, spouse_aid_and_attendance: { "50": 98 } }
    },
    "70_100": {
      no_children: { veteran_alone: { "70": 1759.19 } },
      with_children: { spouse_child: { "70": 2018.19 } }
    }
  }
} as any;

const famNoDeps = { baselineFamily: 'no_children', baselineKey: 'veteran_alone' } as any;

test('minor 10% for 6 months in 2024', () => {
  const total = BP.estimateBackPayUSD('2024-01-01', [{ from: '2024-01-01', rating: 10 }], rates, famNoDeps, new Date('2024-07-01'));
  expect(total).toBe(Math.round(171.23 * 6));
});

test('rating change 40%→70% within 2024 (no deps)', () => {
  const total = BP.estimateBackPayUSD(
    '2024-01-01',
    [{ from: '2024-01-01', rating: 40 }, { from: '2024-06-01', rating: 70 }],
    rates,
    famNoDeps,
    new Date('2024-09-01')
  );
  const expected = Math.round(755.28 * 5 + 1716.28 * 3);
  expect(total).toBe(expected);
});

test('70% with spouse+child spanning into 2025', () => {
  const total = BP.estimateBackPayUSD(
    '2024-10-01',
    [{ from: '2024-10-01', rating: 70 }],
    rates,
    { baselineFamily: 'with_children', baselineKey: 'spouse_child' } as any,
    new Date('2025-03-01')
  );
  // Oct-Nov 2024 (2 mo) @ 1968.28; Dec 2024–Feb 2025 (3 mo) @ 2018.19
  const expected = Math.round(1968.28 * 2 + 2018.19 * 3);
  expect(total).toBe(expected);
});

test('adds: extra under-18 child + spouse A&A at 50% in 2024', () => {
  const total = BP.estimateBackPayUSD(
    '2024-01-01',
    [{ from: '2024-01-01', rating: 50 }],
    rates,
    { baselineFamily: 'with_children', baselineKey: 'spouse_child', extraUnder18: 2, spouseAidAndAttendance: true } as any,
    new Date('2024-04-01')
  );
  const expected = Math.round((1255.16 + 51*2 + 95) * 3);
  expect(total).toBe(expected);
});
