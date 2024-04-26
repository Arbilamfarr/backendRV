import { Injectable } from '@nestjs/common';
import { CreateRenduVousDto } from './dto/create-rendu-vous.dto';
import { UpdateRenduVousDto } from './dto/update-rendu-vous.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RenduVous } from './entities/rendu-vous.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RenduVousService {
  constructor(
    @InjectRepository(RenduVous)
    private renduVousRepository:Repository<RenduVous>,
    

){}
  async create(createRenduVousDto: CreateRenduVousDto) {
    const res=await this.renduVousRepository.save(createRenduVousDto)
    return res;
  }

  async findAll(user:any) {
    if (user.role==='admin'){
      return await this.renduVousRepository.find()
    }
      
    if (user.role==='user'){
     const rendezVous = await this.renduVousRepository.find({
        where: { user: user },
        relations: ['user', 'centre', 'creneau'] });
      return rendezVous
    }
  }

  async findByCentre(centreId:number) {
      return await this.renduVousRepository.find({where: { centre: { id: centreId }},relations: ['user', 'centre', 'creneau']})  
  }

  async findOne(id: number) {
    return await this.renduVousRepository.findOne({where:{id}});
  }

  async update(id: number, updateRenduVousDto: UpdateRenduVousDto) {
    const renduVous=await this.renduVousRepository.findOne({where:{id}});
    if (!renduVous){
      return "not found";
    }
    const renuVousUpdate=this.updateRenduVous(renduVous,updateRenduVousDto)
    const res=await this.renduVousRepository.save(renuVousUpdate);
    return res
  }

  async remove(id: number) {
    return await this.renduVousRepository.delete(id);
  }
   async removeByUser(userId: number) {
  const responses = await this.renduVousRepository.find({ where: { user: { id: userId } } });
  if (responses.length > 0) {
    await Promise.all(responses.map((res) => this.renduVousRepository.remove(res)));
  }
}

  updateRenduVous(renduVous:CreateRenduVousDto,updateRenduVous:UpdateRenduVousDto){
    renduVous.date=updateRenduVous.date?? renduVous.date;
    renduVous.etat=updateRenduVous.etat?? renduVous.etat;
    return renduVous;
  }
}
