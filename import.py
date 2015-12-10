#!/usr/bin/env python3
"""
Converter for local use.
Takes in a single arg: the path to the csv file.
Outputs loans.json and clients.json on the project directory.
"""
import bson
import codecs
import csv
import decimal
import json
import re
import sys

if len(sys.argv) != 2:
    sys.exit("Provide input csv as an arg.")
csvfile = open(sys.argv[1])
reader = csv.DictReader(csvfile)
date_pattern = re.compile("^[0-9]{4}-[0-9]{2}$")

with codecs.open("loans.json", "w", encoding="utf-8") as loans, \
        codecs.open("clients.json", "w", encoding="utf-8") as clients:
    for row in reader:
        crow = {}
        lrow = {'payments': []}
        for k, v in row.items():
            # CLIENTS
            if k == "identifierDump":
                # strip extra white spaces
                crow[k] = re.sub("\s+", " ", v)
            elif k == "agentId":
                crow[k] = v

            # LOANS
            # number
            elif k in ["terms", "amountFinanced", "downpayment",
                       "cashPrice", "onTimePayment"]:
                lrow[k] = int(v)
            # payment
            elif date_pattern.match(k):
                if v != "":
                    lrow['payments'].append({
                        "date": k,
                        "amount": int(v),
                        "_id": {"$oid": str(bson.objectid.ObjectId())}
                    })
            else:
                raise Exception("Header unaccounted for: " + k)
        # ids
        crow['_id'] = {"$oid": str(bson.objectid.ObjectId())}
        lrow['_id'] = {"$oid": str(bson.objectid.ObjectId())}
        lrow['clientId'] = crow['_id']
        loans.write(json.dumps(lrow, ensure_ascii=False)+"\n")
        clients.write(json.dumps(crow, ensure_ascii=False)+"\n")
