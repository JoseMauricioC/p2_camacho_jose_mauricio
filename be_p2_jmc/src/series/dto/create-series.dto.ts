import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSeriesDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo titulo es obligatorio' })
  @IsString({ message: 'El campo titulo debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo titulo no debe ser mayor a 250 caracteres',
  })
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis es obligatorio' })
  @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
  @MaxLength(5000, {
    message: 'El campo sinopsis no debe ser mayor a 5000 caracteres',
  })
  readonly sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director es obligatorio' })
  @IsString({ message: 'El campo director debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo director no debe ser mayor a 100 caracteres',
  })
  readonly director: string;

  @ApiProperty()
  @IsInt({ message: 'El campo temporadas debe ser un número entero' })
  @Min(0, { message: 'El campo temporadas no puede ser negativo' })
  readonly temporadas: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha estreno debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha Estreno debe ser tipo fecha' })
  readonly fechaEstreno: Date;
}
