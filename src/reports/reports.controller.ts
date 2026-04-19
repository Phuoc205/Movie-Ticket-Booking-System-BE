import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('overview')
  getOverview(@Req() req: any) {
    return this.reportsService.getOverview(req.user);
  }

  @Get('revenue-by-day')
  getRevenueByDay(@Query('start') start: string, @Query('end') end: string) {
    return this.reportsService.getRevenueByDay(new Date(start), new Date(end));
  }

  @Get('revenue-by-movie')
  getRevenueByMovie(@Query('limit') limit: number) {
    return this.reportsService.getRevenueByMovie(limit || 10);
  }

  @Get('top-movies')
  getTopMovies(@Query('limit') limit: number) {
    return this.reportsService.getTopMovies(limit || 10);
  }

  @Get('top-buyers')
  getTopBuyers(@Query('limit') limit: string) {
    return this.reportsService.getTopBuyers(Number(limit) || 10);
  }
}