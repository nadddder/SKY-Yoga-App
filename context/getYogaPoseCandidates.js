export function getYogaPoseCandidates(experienceLevel: string): string[] {
    const yogaPoses = {
      beginner1: [
        "Adho Mukha Svanasana",
        "Virabhadrasana I",
        "Virabhadrasana II",
        "Vrksasana",
        "Uttanasana",
        "Phalakasana",
        "Paschimottanasana",
        "Savasana",
        "Setu Bandha Sarvangasana"
      ],
      beginner2: [
        "Adho Mukha Svanasana",
        "Virabhadrasana II",
        "Vrksasana",
        "Paschimottanasana",
        "Savasana",
        "Setu Bandha Sarvangasana",
        "Prasarita Padottanasana",
        "Phalakasana",
        "Navasana"
      ],
      intermediate1: [
        "Virabhadrasana III",
        "Navasana",
        "Prasarita Padottanasana",
        "Salamba Sarvangasana",
        "Bakasana",
        "Purvottanasana",
        "Vasisthasana",
        "Parivrtta Trikonasana",
        "Paschimottanasana"
      ],
      intermediate2: [
        "Virabhadrasana III",
        "Navasana",
        "Prasarita Padottanasana",
        "Salamba Sarvangasana",
        "Purvottanasana",
        "Vasisthasana",
        "Bakasana",
        "Parivrtta Trikonasana",
        "Natarajasana"
      ],
      advanced: [
        "Sirsasana",
        "Urdhva Padmasana",
        "Salamba Sarvangasana",
        "Bakasana",
        "Natarajasana",
        "Virabhadrasana III",
        "Parivrtta Trikonasana",
        "Navasana",
        "Vasisthasana"
      ]
    };
  
    return yogaPoses[experienceLevel] || [];
  }
  