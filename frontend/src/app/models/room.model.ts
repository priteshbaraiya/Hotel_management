export interface Room {
  _id?: string;
  title: string;
  description: string;
  price: number;
  amenities: string[];
  imagePath: string;
  isBooked?: boolean;
}
