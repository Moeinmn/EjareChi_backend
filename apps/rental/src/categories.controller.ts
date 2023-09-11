
import {
    Controller, Get,
} from '@nestjs/common';


@Controller({
    path: 'categories',
    version: '1',
})
export class CategoriesController {
    @Get()
    async getAllRental(){
        return 'Heloooo'
    }
}