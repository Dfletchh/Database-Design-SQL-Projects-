#include "query.h"
#include "table.h"
#include <fstream>
#include <sstream>
#include <cstring>

unordered_map<string, Table*> Table::tables;

Table::Table(const Table* table) 
{
    this->name = table->name + "QUERY";
    this->rows = table->rows;
}

void Table::readTableFromCSV(const string& file) 
{
        string rawname = file.substr(0, file.find_last_of("."));
        Table *ptr = new Table(rawname);

        ifstream ifile(file);                    // open file for reading
        if(ifile.is_open())
        {
            string line, category, entity, year, winner, header, typeHeader;
            stringstream ss;
            Row row;
            
            while (getline(ifile, line, '\n'))   // Retrieves each line in file
            {
                ss.clear();                      // Clear stream flags
                ss.str(line);                    // Parse line
                getline(ss, year, ',');
                getline(ss, category, ',');
                getline(ss, winner, ',');
                getline(ss, entity, '\r');
                Row newRow(year, category, winner, entity); // Assign pair tokens 
                ptr->rows.emplace_back(newRow);             // Vector of row objects
            }
            ifile.close();
        } else ptr = nullptr;
        tables = { {ptr->getTableName(), ptr} };            // Add table to unodered_map
}

Table* Table::runQuery(Query& q) const {
    Table* table = new Table(q.getTable());                // copy constuctor                       
    vector<Row> table_rows = table->getRows();
    int rowCount = -1;

    for(Row row_it: table_rows)                            // FOR each row 
    {                    
        rowCount++;     
        Row new_row;                                       // Create a new row
        for (string att_it: q.getAttributesToReturn()) {   // GET the attributes
            if (q.getCondition()->getBoolValue(row_it))    // WHERE TRUE ie checks condition BEFORE adding/keeping row
            {  
                if (att_it == "*") {                       // IF '*' keep whole row
                    break;                                 // Leave row 
                } else {                                   // ELSE grab corresponding attribute                                      
                    for (pair<string,string> pair_it: row_it.getAttributes()) {
                        if (pair_it.first == att_it) {                            // Check desired attribute type
                            new_row.addToRow(make_pair(att_it, pair_it.second));  // Add attribute to new_row                  
                        }
                    }
                    table_rows[rowCount] = new_row;              // Replace row with new row
                }
            } else {                                             // Doesn't meet condition remove row
                table_rows.erase(table_rows.begin() + rowCount);
                break;
            }
        }
    }
    return table;
}

datatype_t Table::getAttributeType(const string& attName) const {
    if (attName == "category" || attName == "entity")   // String data type
        return STRING;
    else if (attName == "winner")   // Bool data type
        return BOOL;
    else if (attName == "year")     // Int data type
        return INT;
    else 
        return UNKNOWN;             // Unkown data type
}

const void* Row::getValue(const string& attName) const {
    Table table;
    int num;
    bool val = false;
    bool* flag = &val;

    for (pair<string,string> it: attributes)  // Find attribute to return
    {
        if (attName == it.first) {//strcmp(attName.c_str(), it.first.c_str() == 0) { //attName == it.first)
            switch (table.getAttributeType(attName)) {
                case STRING:                  // Char pointer
                    return it.second.c_str();   
                case BOOL:                    // Bool pointer
                    if (strcmp(it.second.c_str(), "TRUE")) {                       
                        val = true; 
                        return flag;
                    } else
                        return flag; 
                case INT:                     // Int pointer
                    {int32_t* ptr = new int32_t(stoi(it.second));      
                    //int* ptr = &num;
                    return ptr;} 
                case UNKNOWN:                 // else null pointer
                    return nullptr;
            }
        }
    } 
    return nullptr; // Should not occur
}

ostream& operator<<(ostream& out, const Table& t) {
    bool first;
    Table table = t;
    Row row;
    vector<Row> rows = table.getRows();

    out << row.getHeader() << endl;
    out << row.getTypes() << endl; 

    for (Row row_it: rows)  // iterate through each row object
    {
        first = true;
        for (pair<string,string> attrib: row_it.getAttributes()) {  // iterate through attributes of that row
            if (!first) {
                out << ", " << attrib.second;
            } else {
                out << attrib.second;
                first = false;
            }
        } 
        out << endl;
    }
    out << "\nNumber of Rows: " << rows.size(); 
    return out;
}

void Row::setHeaders(string hdr, string typeHdr) {
    header = hdr; 
    typeHeader =  typeHdr; 
}

Row::Row(string year, string category, string winner, string entity) {  
    // Create a row of attributes //
    attributes.emplace_back(make_pair("year", year));
    attributes.emplace_back(make_pair("category", category));
    attributes.emplace_back(make_pair("winner", winner));
    attributes.emplace_back(make_pair("entity", entity)); 
}