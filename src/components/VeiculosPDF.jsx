import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  categorySection: {
    marginTop: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSmall: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
  },
  tableColSmallHeader: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableCellBold: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  totalCell: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  totalValueCell: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  grandTotal: {
    marginTop: 20,
    borderTop: 1,
    paddingTop: 10,
  },
  grandTotalText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

const VehiclePDF = ({ vehicle, groupedExpenses, totalExpenses }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{vehicle.name}</Text>
        <Text style={styles.text}>Placa: {vehicle.plate}</Text>
        <Text style={styles.text}>Renavan: {vehicle.renavan}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Histórico de Gastos</Text>
        {Object.entries(groupedExpenses).map(([category, data]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellBold}>Descrição</Text>
                </View>
                <View style={styles.tableColSmallHeader}>
                  <Text style={styles.tableCellBold}>Valor</Text>
                </View>
              </View>
              {data.items.map((expense, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{expense.description}</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>
                      R$ {expense.amount.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.totalRow}>
                <View style={styles.totalCell}>
                  <Text style={styles.tableCellBold}>Total da Categoria</Text>
                </View>
                <View style={styles.totalValueCell}>
                  <Text style={styles.tableCellBold}>
                    R$ {data.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.grandTotal}>
          <Text style={styles.grandTotalText}>
            Total de Todos os Gastos: R$ {totalExpenses.toFixed(2)}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default VehiclePDF;
