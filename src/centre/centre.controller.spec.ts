import { Test, TestingModule } from '@nestjs/testing';
import { CentreController } from './centre.controller';
import { CentreService } from './centre.service';

describe('CentreController', () => {
  let controller: CentreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentreController],
      providers: [CentreService],
    }).compile();

    controller = module.get<CentreController>(CentreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});