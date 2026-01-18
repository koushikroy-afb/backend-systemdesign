#include "XmlToJsonAdapter.h"
#include <fstream>
#include <sstream>

XmlToJsonAdapter::XmlToJsonAdapter(const std::string& file) {
    xmlFile = file;
}

std::string XmlToJsonAdapter::getJson() {
    // Read entire XML file
    std::ifstream file(xmlFile);
    std::stringstream buffer;
    buffer << file.rdbuf();
    std::string xml = buffer.str();

    // Extract FIRST book title
    int t1 = xml.find("<title") ;
    t1 = xml.find(">", t1) + 1;
    int t2 = xml.find("</title>");
    std::string title = xml.substr(t1, t2 - t1);

    // Extract FIRST book author
    int a1 = xml.find("<author>") + 8;
    int a2 = xml.find("</author>");
    std::string author = xml.substr(a1, a2 - a1);

    // Create JSON manually
    std::string json =
        "{\n"
        "  \"bookstore\": {\n"
        "    \"bookname\": \"" + title + " , " + author + "\"\n"
        "  }\n"
        "}";

    return json;
}
