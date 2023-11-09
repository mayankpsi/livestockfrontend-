export const alertsThresholdData = [
  {
    id: 1,
    suffix: "F",
    label: "temperature",
    value: [
      {
        name: "lowTemp",
        lowTemp: 100,
      },
      {
        name: "highTemp",
        highTemp: 104,
      },
    ],
    isEdit: false,
  },
  {
    id: 2,
    suffix: "/min",
    label: "heartbeat",
    value: [
      {
        name: "lowHeartbeat",
        lowHeartbeat: 70,
      },
      {
        name: "highHeartbeat",
        highHeartbeat: 120,
      },
    ],
    isEdit: false,
  },
  {
    id: 3,
    suffix: "/Day",
    label: "steps",
    value: [
      {
        name: "lowSteps",
        lowSteps: 5000,
      },
      {
        name: "highSteps",
        highSteps: 15000,
      },
    ],
    isEdit: false,
  },
  {
    id: 4,
    suffix: "min/Day",
    label: "rumination",
    value: [
      {
        name: "lowRumination",
        lowRumination: 300,
      },
      {
        name: "highRumination",
        highRumination: 600,
      },
    ],
    isEdit: false,
  },
];
