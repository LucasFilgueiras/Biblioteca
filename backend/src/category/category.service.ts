import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { prisma } from 'src/utils/db';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: Category) {
    try {
      const createCategory = await prisma.category.create({
        data: createCategoryDto
      })
      return createCategory;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const findAllCategories = await prisma.category.findMany();
      return findAllCategories;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const findOneCategory = await prisma.category.findUnique({
        where: { id }
      })
      return findOneCategory;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory = await prisma.category.update({
        where: { id },
        data: updateCategoryDto
      })
      return updateCategory;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const removeCategory = await prisma.category.delete({
        where: { id }
      })
      return removeCategory;
    } catch (error) {
      return error;
    }
  }
}
