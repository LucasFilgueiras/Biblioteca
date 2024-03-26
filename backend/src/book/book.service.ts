import { BadRequestException, HttpCode, HttpStatus, Injectable, Res } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { prisma } from 'src/utils/db';
import { IFilterBook } from 'src/interfaces';
import { Response } from 'express';

@Injectable()
export class BookService {
  async create(createBookDto: Book) {
    try {
      const createBook = await prisma.book.create({
        data: createBookDto
      })
      return createBook;
    } catch (error) {
      return error;
    }
  }

  async filterBookByTitle(createBookDto: IFilterBook) {
    try {
      const filterBookByTitle = await prisma.book.findMany({
        where: {
          title: {
            contains: createBookDto.title
          }
        },
        include: {
          category: true
        }
      })
      return filterBookByTitle;
    } catch (error) {
      return error;
    }
  }

  async filterBookByAuthor(createBookDto: IFilterBook) {
    try {
      const filterBookByAuthor = await prisma.book.findMany({
        where: {
          author: {
            contains: createBookDto.author
          }
        },
        include: {
          category: true
        }
      })
      return filterBookByAuthor;
    } catch (error) {
      return error;
    }
  }

  async filterBookByCategory(createBookDto: IFilterBook) {
    try {
      const filterBookByCategory = await prisma.book.findMany({
        where: {
          category: {
            name: {
              contains: createBookDto.categoryName
            }
          }
        },
        include: {
          category: true
        }
      })
      return filterBookByCategory;
    } catch (error) {
      return error;
    }
  }

  async reserve(id: number, reserveAmount: { reserveAmount: number }, @Res() response: Response) {
    try {
      const getTotalCopies = await prisma.book.findUnique({
        where: { id },
        select: {
          id: true,
          availbleCopies: true,
          copies: true
        }
      })
  
      if(reserveAmount.reserveAmount) {
        if(reserveAmount.reserveAmount <= getTotalCopies.availbleCopies) {
          const reserveBook = await prisma.book.update({
            where: { id },
            data: {
              availbleCopies: getTotalCopies.availbleCopies - reserveAmount.reserveAmount
            }
          })
    
          return reserveBook;
        } else {
          return response.status(HttpStatus.BAD_REQUEST).json({
            message: `O máximo de livros disponíveis para reserva é: ${getTotalCopies.availbleCopies}`
          });
        }
      }
    } catch (error) {
      return error;
    }
  }

  async giveBack(id: number, giveBackAmount: { giveBackAmount: number }) {
    try {
      const getTotalCopies = await prisma.book.findUnique({
        where: { id },
        select: {
          id: true,
          availbleCopies: true,
          copies: true
        }
      })
  
      if(giveBackAmount.giveBackAmount) {
        if((giveBackAmount.giveBackAmount + getTotalCopies.availbleCopies) <= getTotalCopies.copies) {
          const giveBackBook = await prisma.book.update({
            where: { id },
            data: {
              availbleCopies: getTotalCopies.availbleCopies + giveBackAmount.giveBackAmount
            }
          })
    
          return giveBackBook;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const findAllBooks = await prisma.book.findMany({
        include: {
          category: true
        }
      });
      return findAllBooks;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const findOneBook = await prisma.book.findUnique({
        where: { id },
        include: {
          category: true
        }
      })
      return findOneBook;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const updateBook = await prisma.book.update({
        where: { id },
        data: updateBookDto
      })
      return updateBook;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const removeBook = await prisma.book.delete({
        where: { id }
      })
      return removeBook;
    } catch (error) {
      return error;
    }
  }
}
