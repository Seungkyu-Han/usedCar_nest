import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Report} from "./report.entity";
import {Repository} from "typeorm";
import {CreateReportDto} from "./dto/CreateReportDto";

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>){}

    async create(createReportDto: CreateReportDto) {
        const report = this.reportsRepository.create(createReportDto);

        return this.reportsRepository.save(report);
    }

}
