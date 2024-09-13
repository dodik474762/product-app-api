import { Controller, Get, Post } from '@nestjs/common';
import { TesmongoService } from './tesmongo.service';
import { User } from 'src/schemas/user.schema';

@Controller('/api/tesmongo')
export class TesmongoController {

    constructor(
        private tesmongoService: TesmongoService
    ) {
    }

    @Get('/')
    index(){
        return "tesmongo"
    }

    @Get('/get')
    get(){
        // console.log(User.name);
        return this.tesmongoService.findAll();
    }
    
    @Post('/create')
    create(){
        return this.tesmongoService.create();
    }

    @Post('/update')
    update(){
        return this.tesmongoService.update();
    }
}
