export function getComfortablePoseCandidates(experienceLevel: string): string[] {
  const comfortablePoses = {
      beginner1: [
          "Savasana",
          "Uttanasana",
          "Vrksasana",
          "Adho Mukha Svanasana",
          "Setu Bandha Sarvangasana",
          "Paschimottanasana",
          "Phalakasana",
          "Garudasana",
          "Matsyasana",
          "Padmasana",
          "Virabhadrasana I",
          "Virabhadrasana II",
          "Prasarita Padottanasana",
          "Navasana",
          "Marichyasana D"
      ],
      beginner2: [
          "Virabhadrasana I",
          "Virabhadrasana II",
          "Vrksasana",
          "Adho Mukha Svanasana",
          "Setu Bandha Sarvangasana",
          "Paschimottanasana",
          "Phalakasana",
          "Garudasana",
          "Matsyasana",
          "Padmasana",
          "Prasarita Padottanasana",
          "Navasana",
          "Ardha Chandrasana",
          "Supta Padangusthasana",
          "Ustrasana"
      ],
      intermediate1: [
          "Virabhadrasana III",
          "Navasana",
          "Prasarita Padottanasana",
          "Garudasana",
          "Parivrtta Trikonasana",
          "Vasisthasana",
          "Dhanurasana",
          "Ustrasana",
          "Salamba Sarvangasana",
          "Purvottanasana",
          "Kapotasana",
          "Bakasana",
          "Natarajasana",
          "Eka Hasta Mayurasana",
          "Urdhva Padmasana"
      ],
      intermediate2: [
          "Virabhadrasana III",
          "Navasana",
          "Prasarita Padottanasana",
          "Garudasana",
          "Parivrtta Trikonasana",
          "Vasisthasana",
          "Dhanurasana",
          "Ustrasana",
          "Salamba Sarvangasana",
          "Purvottanasana",
          "Kapotasana",
          "Bakasana",
          "Natarajasana",
          "Eka Hasta Mayurasana",
          "Supta Padangusthasana"
      ],
      advanced: [
          "Sirsasana",
          "Pincha Mayurasana",
          "Natarajasana",
          "Virabhadrasana III",
          "Bakasana",
          "Eka Hasta Mayurasana",
          "Garudasana",
          "Kapotasana",
          "Marichyasana D",
          "Matsyasana",
          "Padmasana",
          "Supta Padangusthasana",
          "Ustrasana",
          "Urdhva Padmasana",
          "Vasisthasana"
      ]
  };

  return comfortablePoses[experienceLevel] || [];
}

export function getGoalPoseCandidates(experienceLevel: string): string[] {
  const goalPoses = {
      beginner1: [
          "Adho Mukha Svanasana",
          "Virabhadrasana I",
          "Virabhadrasana II",
          "Vrksasana",
          "Uttanasana",
          "Setu Bandha Sarvangasana",
          "Paschimottanasana",
          "Phalakasana",
          "Garudasana",
          "Matsyasana",
          "Padmasana",
          "Prasarita Padottanasana",
          "Navasana",
          "Ardha Chandrasana",
          "Ustrasana"
      ],
      beginner2: [
          "Virabhadrasana III",
          "Prasarita Padottanasana",
          "Garudasana",
          "Parivrtta Trikonasana",
          "Vasisthasana",
          "Dhanurasana",
          "Ustrasana",
          "Salamba Sarvangasana",
          "Purvottanasana",
          "Kapotasana",
          "Bakasana",
          "Natarajasana",
          "Eka Hasta Mayurasana",
          "Supta Padangusthasana",
          "Pincha Mayurasana"
      ],
      intermediate1: [
          "Sirsasana",
          "Natarajasana",
          "Pincha Mayurasana",
          "Bakasana",
          "Kapotasana",
          "Eka Hasta Mayurasana",
          "Garudasana",
          "Virabhadrasana III",
          "Marichyasana D",
          "Matsyasana",
          "Padmasana",
          "Urdhva Padmasana",
          "Supta Padangusthasana",
          "Ustrasana",
          "Vasisthasana"
      ],
      intermediate2: [
          "Sirsasana",
          "Pincha Mayurasana",
          "Natarajasana",
          "Virabhadrasana III",
          "Bakasana",
          "Eka Hasta Mayurasana",
          "Garudasana",
          "Kapotasana",
          "Marichyasana D",
          "Matsyasana",
          "Padmasana",
          "Supta Padangusthasana",
          "Ustrasana",
          "Urdhva Padmasana",
          "Vasisthasana"
      ],
      advanced: [
          "Sirsasana",
          "Pincha Mayurasana",
          "Natarajasana",
          "Bakasana",
          "Eka Hasta Mayurasana",
          "Kapotasana",
          "Marichyasana D",
          "Matsyasana",
          "Padmasana",
          "Urdhva Padmasana",
          "Supta Padangusthasana",
          "Ustrasana",
          "Garudasana",
          "Vasisthasana",
          "Virabhadrasana III"
      ]
  };

  return goalPoses[experienceLevel] || [];
}