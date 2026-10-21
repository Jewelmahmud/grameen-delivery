import 'package:flutter_test/flutter_test.dart';
import 'package:grameen_delivery_merchant/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const GrameenMerchantApp());
    expect(find.byType(GrameenMerchantApp), findsOneWidget);
  });
}
