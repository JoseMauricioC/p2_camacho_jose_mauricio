import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './entities/series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series) private seriesRepository: Repository<Series>,
  ) {}
  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const existe = await this.seriesRepository.findOneBy({
      titulo: createSeriesDto.titulo.trim(),
    });

    if (existe) throw new ConflictException('La serie ya existe');

    const serie = new Series();
    serie.idPais = createSeriesDto.idPais;
    serie.titulo = createSeriesDto.titulo.trim();
    serie.sinopsis = createSeriesDto.sinopsis.trim();
    serie.director = createSeriesDto.director.trim();
    serie.temporadas = createSeriesDto.temporadas;
    serie.fechaEstreno = createSeriesDto.fechaEstreno;
    return this.seriesRepository.save(serie);
  }

  async findAll(): Promise<Series[]> {
    return this.seriesRepository.find({
      relations: { paises: true },
      select: {
        id: true,
        titulo: true,
        sinopsis: true,
        director: true,
        temporadas: true,
        fechaEstreno: true,
        paises: { id: true, descripcion: true },
      },
    });
  }

  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOne({
      where: { id },
      relations: { paises: true },
    });

    if (!serie) throw new NotFoundException('la serie no existe');

    return serie;
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    const serie = await this.findOne(id);
    const serieUpdate = Object.assign(serie, updateSeriesDto);
    return this.seriesRepository.save(serieUpdate);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    if (serie) return this.seriesRepository.softRemove(serie);
  }
}
