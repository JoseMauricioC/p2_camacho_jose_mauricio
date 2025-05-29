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
    serie.titulo = createSeriesDto.titulo.trim();
    serie.sinopsis = createSeriesDto.sinopsis.trim();
    serie.director = createSeriesDto.director.trim();
    serie.temporadas = createSeriesDto.temporadas;
    serie.fechaEstreno = createSeriesDto.fechaEstreno;
    return this.seriesRepository.save(serie);
  }

  async findAll() {
    return this.seriesRepository.find();
  }

  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOneBy({ id });
    if (!serie) throw new NotFoundException('La serie no existe');
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
