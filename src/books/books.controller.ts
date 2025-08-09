// src/books/books.controller.ts
import { Controller, Get, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gurad';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/role.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Logged-in users only
  create(@Body() body: { title: string; author: string }) {
    return this.booksService.create(body.title, body.author);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) // Logged-in & role check
  @Role('admin')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
