import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class FilterRescueDto {
  @ApiPropertyOptional({ example: 20.659698, description: 'Latitud del mecánico' })
  @Type(() => Number)
  @IsNumber()
  latitude!: number;

  @ApiPropertyOptional({ example: -103.349609, description: 'Longitud del mecánico' })
  @Type(() => Number)
  @IsNumber()
  longitude!: number;

  @ApiPropertyOptional({ example: 10, description: 'Radio de búsqueda en kilómetros', default: 10 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  radiusKm?: number = 10;
}