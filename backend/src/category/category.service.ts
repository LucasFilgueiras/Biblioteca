import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { prisma } from 'src/utils/db';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: Category) {
    const createCategory = await prisma.category.create({
      data: createCategoryDto
    })
    return createCategory;
  }

  async findAll() {
    const findAllCategories = await prisma.category.findMany();
    return findAllCategories;
  }

  async findOne(id: number) {
    const findOneCategory = await prisma.category.findUnique({
      where: { id }
    })
    return findOneCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await prisma.category.update({
      where: { id },
      data: updateCategoryDto
    })
    return updateCategory;
  }

  async remove(id: number) {
    const removeCategory = await prisma.category.delete({
      where: { id }
    })
    return removeCategory;
  }
}
