import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.knightsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knightsService.findOne(id);
  }

  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnightDto: UpdateKnightDto) {
    return this.knightsService.update(id, updateKnightDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knightsService.remove(id);
  }
}
