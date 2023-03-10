#ifndef __TABLE_H
#define __TABLE_H

#include <string>
#include <iostream>
#include <unordered_map>
#include <vector>
#include "query.h"
using namespace std;

enum datatype_t { UNKNOWN, BOOL, INT, STRING };

class Table;
class Row;
class Query;

class Table
{
private:
  static unordered_map<string, Table*> tables;
  string name;
  vector<Row> rows;
public:
  Table() {}
  Table(const string name) { this->name = name; }
  Table(const Table* table);

  const vector<Row>& getRows() { return rows; }
  const string getTableName() { return name; }

  //Constructs a Table based on the data in the given CSV file
  //Name of Table should be the string before ".csv"
  static void readTableFromCSV(const string& file);

  //Constructs a Table based on the data in the file (name + ".dat")
  static Table* getTableByName(const string& name)
    { return tables.count(name)?  tables[name] : nullptr; }

  //Returns the datatype of the given attribute
  datatype_t getAttributeType(const string& attName) const;

  //Runs the given query on this Table, and returns a new Table with the result
  //The rows of the new Table should be the ones that cause q.getCondition()->getBoolValue(row) to return true
  //The attributes should be the ones returned by q.getAttributesToReturn(), unless
  // q.getAttributesToReturn returns the single attribute "*" (new table has all attributes)
  Table* runQuery(Query& q) const;

  static void printTableNames()
    { for (auto& p : tables) cout << p.first << '\n'; }
  //Returns this table's name
  string getName() const
    { return name; }
  //Removes this table from the map when deleted
  ~Table()
    { if (tables.count(name) > 0) tables.erase(name); }
};

class Row
{
private:
  string header;
  string typeHeader;
  vector<pair<string,string>> attributes; // < type, data >
public:
  Row() {}
  Row(string, string, string, string);
  
  void setHeaders(string hdr, string typeHdr);
  string getHeader() { return header; }
  string getTypes() { return typeHeader; }

  vector<pair<string,string>> getAttributes() {return attributes;}
  void addToRow(pair<string,string> pair) {attributes.emplace_back(pair);}
  //Returns the value of the given attribute for this row
  const void* getValue(const string& attName) const;
};

//Prints the given Table to an output stream
//Format is the same as the CSV file
ostream& operator<<(ostream&, const Table&);

// *** Add the line below to table.cpp ***
//unordered_map<string, Table*> Table::tables;
//Initializes static data member

#endif //__TABLE_H