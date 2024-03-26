import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { IFilterBook } from 'src/interfaces';
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: Book) {
    return this.bookService.create(createBookDto);
  }

  @Post("/filterByTitle")
  filterBookByTitle(@Body() createBookDto: IFilterBook) {
    return this.bookService.filterBookByTitle(createBookDto);
  }

  @Post("/filterByAuthor")
  filterBookByAuthor(@Body() createBookDto: IFilterBook) {
    return this.bookService.filterBookByAuthor(createBookDto);
  }

  @Post("/filterByCategory")
  filterBookByCategory(@Body() createBookDto: IFilterBook) {
    return this.bookService.filterBookByCategory(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Patch('/reserve/:id')
  reserve(@Param('id') id: string, @Body() reserveAmount: { reserveAmount: number }, @Res() response: Response) {
    return this.bookService.reserve(+id, reserveAmount, response);
  }

  @Patch('/giveBack/:id')
  giveBack(@Param('id') id: string, @Body() giveBackAmount: { giveBackAmount: number }) {
    return this.bookService.giveBack(+id, giveBackAmount);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
