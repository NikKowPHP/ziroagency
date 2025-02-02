
export interface Testimonial {
    readonly id: string;
    readonly author: string;
    readonly role: string;
    readonly company: string;
    readonly quote: string;
    readonly image: string;
  readonly imageAlt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
