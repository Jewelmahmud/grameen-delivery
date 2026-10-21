import 'package:flutter_test/flutter_test.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';

void main() {
  test('AppConstants formatCurrency formats BDT properly', () {
    expect(AppConstants.formatCurrency(50.0), '৳50.00');
  });
}
