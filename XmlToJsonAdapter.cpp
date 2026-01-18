#include "XmlToJsonAdapter.h"

using namespace tinyxml2;

// ✅ CONSTRUCTOR IMPLEMENTATION (THIS WAS THE PROBLEM)
XmlToJsonAdapter::XmlToJsonAdapter(const std::string& file)
    : xmlFile(file) {}

// Recursive helper
nlohmann::json XmlToJsonAdapter::elementToJson(XMLElement* element) {
    nlohmann::json j;

    // Attributes
    const XMLAttribute* attr = element->FirstAttribute();
    while (attr) {
        j["@"+std::string(attr->Name())] = attr->Value();
        attr = attr->Next();
    }

    // Text
    if (element->GetText()) {
        j["#text"] = element->GetText();
    }

    // Children
    XMLElement* child = element->FirstChildElement();
    while (child) {
        j[child->Name()].push_back(elementToJson(child));
        child = child->NextSiblingElement();
    }

    return j;
}

std::string XmlToJsonAdapter::getJson() {
    XMLDocument doc;
    doc.LoadFile(xmlFile.c_str());

    XMLElement* root = doc.RootElement();          // <bookstore>
    XMLElement* book = root->FirstChildElement("book"); // first <book>

    const char* title = book->FirstChildElement("title")->GetText();
    const char* author = book->FirstChildElement("author")->GetText();

    nlohmann::json result;
    result["bookstore"]["bookname"] =
        std::string(title) + " , " + std::string(author);

    return result.dump(4);
}



