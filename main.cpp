#include <iostream>
#include "XmlToJsonAdapter.h"

int main() {
    IDataConverter* converter =
        new XmlToJsonAdapter("sample.xml");

    std::cout << converter->getJson() << std::endl;

    delete converter;
    return 0;
}

