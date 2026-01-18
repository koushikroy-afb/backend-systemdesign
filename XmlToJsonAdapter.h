#ifndef XMLTOJSONADAPTER_H
#define XMLTOJSONADAPTER_H

#include "IDataConverter.h"
#include "tinyxml2.h"
#include "json.hpp"
#include <string>

class XmlToJsonAdapter : public IDataConverter {
private:
    std::string xmlFile;

    nlohmann::json elementToJson(tinyxml2::XMLElement* element);

public:
    XmlToJsonAdapter(const std::string& file);
    std::string getJson() override;
};

#endif
