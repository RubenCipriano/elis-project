import 'dart:convert';
import 'package:http/http.dart' as http;

class Requests {
  static Future<dynamic> post(
    String requestedUrl,
    Object encondedRequest,
    String? accessToken,
  ) async {
    final url = Uri.parse(requestedUrl);

    try {
      var headerRequest = {'Content-Type': 'application/json'};

      if (accessToken != null) {
        headerRequest['Authorization'] = accessToken;
      }

      print({url, headerRequest, json.encode(encondedRequest)});

      final response = await http.post(
        url,
        headers: headerRequest,
        body: json.encode(encondedRequest),
      );

      if (response.statusCode == 200) {
        // Successfully logged in
        final data = json.decode(response.body);
        // Assuming the token is returned in the 'token' field
        return data;
      }

      return null;
    } catch (e) {
      return null;
    }
  }
}
