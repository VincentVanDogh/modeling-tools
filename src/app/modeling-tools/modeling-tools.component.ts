import { Component, OnInit } from '@angular/core';
import {CheckedModelingToolColumns, ModelingTool, ModelingToolSearch} from "./dto/modeling-tool";
import modelingToolsFile from "./resources/web-modeling-tools.json";

@Component({
  selector: 'app-modeling-tools',
  templateUrl: './modeling-tools.component.html',
  styleUrls: ['./modeling-tools.component.css']
})
export class ModelingToolsComponent implements OnInit {
  modelingTools: ModelingTool[] = [];
  modelingToolSearch: ModelingToolSearch = {}
  modelingToolSearchResult: ModelingTool[] = [];
  modelingToolCreate: ModelingTool = {
    name: "",
    link: ""
  }
  checkedColumns: CheckedModelingToolColumns = {
    appFramework: true,
    category: true,
    creator: true,
    license: true,
    loginRequired: true,
    openSource: true,
    os: true,
    programmingLanguage: true
  }

  constructor() { }

  ngOnInit(): void {
    this.modelingTools = modelingToolsFile;
  }

  /**
   * Filters Modeling Tools that fit the filtering options
   */
  searchModelingTool(): void {
    let toolList: ModelingTool[] = [];
    const db: ModelingTool[] = modelingToolsFile;

    for (let i = 0; i < db.length; i++) {
      // TODO: Add license
      if (
        (this.contains(this.modelingToolSearch.name, db[i].name)) &&
        (this.modelingToolSearch.openSource == undefined || this.modelingToolSearch.openSource == db[i].openSource) &&
        (this.contains(this.modelingToolSearch.appFramework, db[i].appFramework)) &&
        (this.modelingToolSearch.webApp == undefined || this.modelingToolSearch.webApp == db[i].webApp) &&
        (this.modelingToolSearch.desktopApp == undefined || this.modelingToolSearch.desktopApp == db[i].desktopApp) &&
        (this.contains(this.modelingToolSearch.category, db[i].category)) &&
        (this.modelingToolSearch.loginRequired == undefined || this.modelingToolSearch.loginRequired == db[i].loginRequired) &&
        (this.contains(this.modelingToolSearch.creator, db[i].creator))
      ) {
        toolList.push(db[i]);
      }
    }
    this.modelingTools = toolList;
  }

  /**
   *
   * @param keyword Substring expected to be contained within the string
   * @param string String of characters which may or may not contain a keyword
   *
   * Returns true if the keyword's character in the given order are within the string
   */
  contains(keyword: string | undefined, string: string | undefined): boolean {
    if (keyword == undefined || string == undefined || keyword.length == 0) {
      return true;
    }
    if (keyword.length > string.length) {
      return false;
    }
    let k = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i].toLowerCase() === keyword[k].toLowerCase()) {
        k++;
      } else k = 0;
      if (k == keyword.length) {
        return true;
      }
    }
    return false;
  }

  onSubmit(): void {
    this.modelingTools.push(this.modelingToolCreate);
  }

  /**
   *
   * @param link to the website of the modeling tool provider
   *
   * Redirects a user to the page of the link he/she have clicked on
   */
  redirect(link: string): void {
    window.location.href = link;
  }
}
