#ifndef IDATACONVERTER_H
#define IDATACONVERTER_H

#include <string>

class IDataConverter {
public:
    virtual std::string getJson() = 0;
    virtual ~IDataConverter() {}
};

#endif
