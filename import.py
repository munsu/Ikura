#!/usr/bin/env python3
"""
Converter for local use.
Takes in a single arg: the path to the csv file.
Outputs loans.json on the project directory.
"""
import bson
import codecs
import csv
import json
import re
import sys

if len(sys.argv) != 2:
    sys.exit("Provide input csv as an arg.")
csvfile = open(sys.argv[1])
reader = csv.DictReader(csvfile)
date_pattern = re.compile("^[0-9]{4}-[0-9]{2}$")

with codecs.open("loans.json", "w", encoding="utf-8") as loans:
    for row in reader:
        lrow = {'payments': []}
        for k, v in row.items():
            if k == "name":
                # strip extra white spaces
                lrow[k] = re.sub("\s+", " ", v)

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
            elif k in ["interestRate", "agentId"]:
                # store interest rate as a string
                lrow[k] = v
            else:
                raise Exception("Header unaccounted for: " + k)
        # ids
        lrow['_id'] = {"$oid": str(bson.objectid.ObjectId())}
        loans.write(json.dumps(lrow, ensure_ascii=False)+"\n")
