export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
  readonly quote: string;
  readonly goal: string;
  readonly image: {
    readonly url: string;
    readonly alt: string;
  };
  readonly createdAt: Date;
} 