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
        "Virabhadrasana II"
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
        "Navasana"
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
        "Bakasana"
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
        "Bakasana"
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
        "Supta Padangusthasana"
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
        "Prasarita Padottanasana"
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
        "Natarajasana"
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
        "Urdhva Padmasana"
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
        "Supta Padangusthasana"
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
        "Ustrasana"
      ]
    };
  
    return goalPoses[experienceLevel] || [];
  }
  