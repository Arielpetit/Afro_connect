// types/event.ts
export interface Event {
    id?: string;
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    speaker: string;
    speakerBio: string;
    registrationLink: string;
    createdAt?: Date;
  }