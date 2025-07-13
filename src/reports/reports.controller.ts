import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {CreateReportDto} from "./dto/CreateReportDto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guards/auth.guards";

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() createReportDto: CreateReportDto){
        return this.reportsService.create(createReportDto);
    }
}
