import { Component } from '@angular/core';
import {ApicallService} from 'src/app/apicall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  search:any;
  source:string;
  options: any[] = [{id:'hackernews',value:'Hacker News'}, {id:'wikisearch',value:'Wiki Search'}];
  data:object[];
  constructor(private apicallService: ApicallService) { }
  submit() {
    if(this.source == "hackernews" && this.search){this.callHackerNews(this.search)};
    if(this.source == "wikisearch" && this.search){this.callWikiSearch(this.search)};
  }

  
  callHackerNews(searchVal) {
    let authors={"steve":200};
    this.apicallService.getHackerNews(searchVal)
      .subscribe((data: any) => {

        this.data = JSON.parse(JSON.stringify(data.hits));
        this.data.forEach(obj => {
          this.apicallService.getAuthSubmissionCount(obj['author'])
          .subscribe((data: any) => {
            obj['submissionCount'] = data.submission_count;
            console.log(obj)
          });
        })
      });
  }

  callWikiSearch(searchVal) {
    this.apicallService.getWikiSearch(searchVal)
      .subscribe((data: any) => {
        
        let tempData = [];
        
        for(let i=0;i<data[1].length;i++){
          let obj = {};
          obj['title'] = data[1][i];
          tempData.push(obj)
        }
        for(let j=0;j<data[3].length;j++){
          let obj = {};
          tempData[j]['author'] = data[3][j];
        }
        this.data= tempData;
        console.log(tempData)
      });
  }
}
