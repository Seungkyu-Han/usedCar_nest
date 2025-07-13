import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude
} from 'class-validator';

export class CreateReportDto {
    @IsString()
    maker: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    mileage: number;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;

    @IsNumber()
    price: number;
}