import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Pais } from './entities/pais.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais) private paisesRepository: Repository<Pais>,
  ) {}
  async create(createPaiseDto: CreatePaisDto): Promise<Pais> {
    const pais = new Pais();
    pais.descripcion = createPaiseDto.descripcion.trim();
    return this.paisesRepository.save(pais);
  }

  async findAll() {
    return this.paisesRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisesRepository.findOneBy({ id });
    if (!pais) throw new NotFoundException('La serie no existe');
    return pais;
  }

  async update(id: number, updatePaiseDto: UpdatePaisDto) {
    const pais = await this.findOne(id);
    const paisUpdate = Object.assign(pais, updatePaiseDto);
    return this.paisesRepository.save(paisUpdate);
  }

  async remove(id: number) {
    const pais = await this.findOne(id);
    if (pais) return this.paisesRepository.softRemove(pais);
  }
}
