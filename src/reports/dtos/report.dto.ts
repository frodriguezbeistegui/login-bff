import { Expose, Transform } from 'class-transformer';

export class objDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id) // obj is a standard for this library but is referencing the current report
  @Expose()
  userId: number;
}
