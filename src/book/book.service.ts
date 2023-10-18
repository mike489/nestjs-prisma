import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schemas';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModule: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModule.find({ ...keyword });
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModule.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModule.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModule.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModule.findByIdAndDelete(id);
  }
}
