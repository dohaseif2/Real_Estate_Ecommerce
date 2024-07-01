<?php

namespace App\Repositories;

use App\Models\ReasonReport;

class ReasonReportRepository implements ReasonReportRepositoryInterface
{
    public function storeReason(array $data)
    {
        return ReasonReport::create($data);
    }
    public function showPropertiesReportReasons()
    {
        return ReasonReport::where('type', 'report-property')->get();
    }
    public function showUsersReportReasons()
    {
        return ReasonReport::where('type', 'report-user')->get();
    }
    public function deleteReportReason($id)
    {
        $reason= ReasonReport::find($id);
        if(!$reason){
            return null;
        }
        $reason->delete();
        return true;
    }
    public function showAllReasons(){
        return ReasonReport::all();
    }
}
