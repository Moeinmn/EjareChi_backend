import {
  Body,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  Controller,
  ParseUUIDPipe,
  Get,
  Post,
  Delete,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductCreateReq,
  ProductEntity,
  ProductUpdateReq,
} from './dtos/products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User, UserType } from '../decorators/user.decorator';
import { userType } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Get()
  async getAllProducts(
    @Query('approved') approvedStatus?: boolean,
    @User() user?: UserType,
  ): Promise<ProductEntity[]> {
    console.log(user);

    return await this.productsService.getAllProductsService(approvedStatus);
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Get(':id')
  async getProductByID(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.getProductByIDService(id);
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Post('/create')
  async createProduct(
    @Body() productDTO: ProductCreateReq,
    @User() user?: UserType,
  ): Promise<ProductEntity> {
    return await this.productsService.createProductService(
      productDTO,
      user.userId,
    );
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Put('/update/:id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateDTO: ProductUpdateReq,
    @User() user?: UserType,
  ): Promise<ProductEntity> {
    try {
      //for finde creator of home with id in query
      const userCreator = await this.productsService.getUserIdByhomeId(id);
      //for check the creator prodcuts is equal to jwt request
      if (userCreator.id !== user.userId) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    return await this.productsService.updateProductService(
      id,
      productUpdateDTO,
    );
  }

  @Roles(userType.ADMIN)
  @Post('/approve/:id')
  async approveProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.approveProductService(id);
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user?: UserType,
  ): Promise<string> {
    try {
      //for finde creator of home with id in query
      const userCreator = await this.productsService.getUserIdByhomeId(id);
      //for check the creator prodcuts is equal to jwt request
      if (userCreator.id !== user.userId) {
        throw new UnauthorizedException();
      }

      return await this.productsService.deleteProductService(id);
    } catch (error) {
      throw new UnauthorizedException();
    }
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
