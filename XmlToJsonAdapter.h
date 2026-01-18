#ifndef XMLTOJSONADAPTER_H
#define XMLTOJSONADAPTER_H

#include "IDataConverter.h"
#include <string>

class XmlToJsonAdapter : public IDataConverter {
private:
    std::string xmlFile;

public:
    XmlToJsonAdapter(const std::string& file);
    std::string getJson() override;
};

#endif
