import 'package:flutter_test/flutter_test.dart';
import 'package:grameendelivery/main.dart';

void main() {
  testWidgets('Rider app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const GrameenRiderApp());
    expect(find.byType(GrameenRiderApp), findsOneWidget);
  });
}
