import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { prisma } from 'src/utils/db';
import { IFilterBook } from 'src/interfaces';

@Injectable()
export class BookService {
  async create(createBookDto: Book) {
    const createBook = await prisma.book.create({
      data: createBookDto
    })
    return createBook;
  }

  async filterBookByTitle(createBookDto: IFilterBook) {
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
  }

  async filterBookByAuthor(createBookDto: IFilterBook) {
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
  }

  async filterBookByCategory(createBookDto: IFilterBook) {
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
  }

  async reserve(id: number, reserveAmount: { reserveAmount: number }) {
    const getTotalCopies = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        availbleCopies: true,
        copies: true
      }
    })

    if(reserveAmount.reserveAmount <= getTotalCopies.availbleCopies) {
      const reserveBook = await prisma.book.update({
        where: { id },
        data: {
          availbleCopies: getTotalCopies.availbleCopies - reserveAmount.reserveAmount
        }
      })

      return reserveBook;
    }
  }

  async giveBack(id: number, giveBackAmount: { giveBackAmount: number }) {
    const getTotalCopies = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        availbleCopies: true,
        copies: true
      }
    })

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

  async findAll() {
    const findAllBooks = await prisma.book.findMany({
      include: {
        category: true
      }
    });
    return findAllBooks;
  }

  async findOne(id: number) {
    const findOneBook = await prisma.book.findUnique({
      where: { id },
      include: {
        category: true
      }
    })
    return findOneBook;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updateBook = await prisma.book.update({
      where: { id },
      data: updateBookDto
    })
    return updateBook;
  }

  async remove(id: number) {
    const removeBook = await prisma.book.delete({
      where: { id }
    })
    return removeBook;
  }
}
