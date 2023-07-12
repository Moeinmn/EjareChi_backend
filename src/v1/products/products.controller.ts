import { Controller, ParseUUIDPipe, Get, Post, Delete } from '@nestjs/common';
<<<<<<< HEAD
import {
  Body,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
=======
import { Body, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
>>>>>>> 9ca901e86f39d46a0718f6868d97dd255a74c1f1
import { ProductsService } from './products.service';
import {
  ProductCreateReq,
  ProductEntity,
  ProductUpdateReq,
} from './dtos/products.dto';
<<<<<<< HEAD
import { FilesInterceptor } from '@nestjs/platform-express';
=======
import { FileInterceptor } from '@nestjs/platform-express';
>>>>>>> 9ca901e86f39d46a0718f6868d97dd255a74c1f1

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getAllProducts(
    @Query('approved') approvedStatus?: boolean,
  ): Promise<ProductEntity[]> {
    return await this.productsService.getAllProductsService(approvedStatus);
  }
  @Get(':id')
  async getProductByID(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.getProductByIDService(id);
  }
  @Post('/create')
  async createProduct(
    @Body() productDTO: ProductCreateReq,
  ): Promise<ProductEntity> {
    return await this.productsService.createProductService(productDTO);
  }
  @Post('/update/:id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateDTO: ProductUpdateReq,
  ): Promise<ProductEntity> {
    return await this.productsService.updateProductService(
      id,
      productUpdateDTO,
    );
  }
  //Guard
  @Post('/approve/:id')
  async approveProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.approveProductService(id);
  }
  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productsService.deleteProductService(id);
  }
  @Post('/test')
  @UseInterceptors(
    FilesInterceptor('files', 7, {
      dest: './uploads',
    }),
  )
  async aaa(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productDTO: ProductCreateReq,
  ): Promise<string> {
    console.log('productDTO', productDTO);
    console.log('files', files);

    return 'success'; //await this.productsService.createProductService(productDTO);
  }
}
