import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(title: string, author: string) {
    const book = this.repo.create({ title, author });
    return this.repo.save(book);
  }

  async remove(id: number) {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.repo.remove(book);
    return { message: `Book with ID ${id} deleted successfully` };
  }
}
